<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\GoogleCalendar\Event;
use Illuminate\Routing\Controller;

use Google\Client as GoogleClient;
use Google\Service\Calendar as GoogleCalendarService;
use Google\Service\Calendar\Event as GoogleCalendarEvent;

class GmeetController extends Controller {
    /** @var GoogleClient */
    public $googleClient;

    /** @var GoogleCalendarService */
    public $calendarService;

    public function __construct() {
        $this->googleClient = new GoogleClient();
        $this->googleClient->setAuthConfig(storage_path('app/google-calendar/service-account-credentials.json'));
        $this->googleClient->setScopes([GoogleCalendarService::CALENDAR]);
        $this->calendarService = new GoogleCalendarService($this->googleClient);
    }

    /* Function to Get all Calendars */
    public function getAllCalendars() {
        try {
            // Get list of calendars
            $calendars = $this->calendarService->calendarList->listCalendarList();

            if (empty($calendars->getItems())) {
                return apiResponse("No Calendars Found", 'error', 404);
            }

            // Return API response
            return apiResponse("Calendars Fetched Successfully", 'success', 200, $calendars->getItems());
        } catch (\Exception $e) {
            return apiResponse("Error: " . $e->getMessage(), 'error', 500);
        }
    }

    /* get all Bookings */
    public function getAllBookings() {
        // Get list of calendars
        $calendars = $this->calendarService->calendarList->listCalendarList();

        // Fetch events from each calendar
        $allEvents = [];
        $calendarId = env('GOOGLE_CALENDAR_ID');
        $events = $this->calendarService->events->listEvents($calendarId);
        $allEvents[$calendarId] = $events->getItems();
        // foreach ($calendars as $calendar) {
        // }

        // Return API response
        return apiResponse("Events Fetched Successfully", 'success', 200, $allEvents);
    }

    /* Function to create a New Booking */
    public function createNewBooking(Request $request) {
        try {
            $body = $request->all();
            $eventName = $body['meetTitle'];
            $startTime = Carbon::parse($body['meetStart'])->format('Y-m-d\TH:i:sP');
            $endTime = Carbon::parse($body['meetStart'])->addMinutes($body['meetDuration'])->format('Y-m-d\TH:i:sP');

            // Define event details
            $event = new GoogleCalendarEvent([
                'summary' => $eventName,
                'location' => 'Online Meeting',
                'description' => $body['meetDesc'],
                'start' => ['dateTime' => $startTime, 'timeZone' => 'UTC'],
                'end' => ['dateTime' => $endTime, 'timeZone' => 'UTC'],
                'conferenceData' => [
                    'createRequest' => ['requestId' => 'random-unique-id'],
                    'entryPoints' => [
                        [
                            'entryPointType' => 'video',
                            'uri' => "https://zoom.us/j/93831668388?pwd=UHRqU0VwMjF3d1B0VXU5bFBRYWIxdz09",
                        ]
                    ]
                ],
                'reminders' => array(
                    'useDefault' => FALSE,
                    'overrides' => array(
                        array('method' => 'email', 'minutes' => 10),
                        array('method' => 'popup', 'minutes' => 10),
                    ),
                ),
            ]);

            $calendarId = env('GOOGLE_CALENDAR_ID'); // Use 'primary' for the primary calendar

            // Insert event
            $createdEvent = $this->calendarService->events->insert($calendarId, $event);
            return apiResponse("New Booking Created Successfully", 'success', 200, $createdEvent);
        } catch (\Throwable $th) {
            //throw $th;
            dd($th);
            return apiResponse("Error in api",  'success', 500, $th->name);
        }
    }

    /* Function to create a New Booking */
    public function updateBooking(Request $request) {
        $body = $request->all();
        $eventID = $body['eventID'];
        $eventName = $body['eventName'];

        $googleEvent = Event::find($eventID);
        $googleEvent->name = $eventName;
        $googleEvent->save();
        return apiResponse("New Booking Created Successfully",  'success', 200, $googleEvent);
    }

    /* Function to create a New Booking */
    public function deleteBooking(Request $request) {
        $body = $request->all();
        $eventID = $body['eventID'];

        $googleEvent = Event::find($eventID);
        $googleEvent->delete();

        return apiResponse("Booking Deleted Successfully",  'success', 200, $googleEvent);
    }
}

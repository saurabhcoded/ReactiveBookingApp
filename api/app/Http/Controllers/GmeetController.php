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
    public static $googleClient;

    /** @var GoogleCalendarService */
    public static $calendarService;

    /* Service Account Calendar ID */
    public static $calendarId;

    public function __construct() {
        // Ensure static properties are initialized only once
        if (!self::$googleClient) {
            self::$googleClient = new GoogleClient();
            self::$googleClient->setAuthConfig(storage_path('app/google-calendar/service-account-credentials.json'));
            self::$googleClient->setScopes([GoogleCalendarService::CALENDAR]);
        }
        if (!self::$calendarId) {
            self::$calendarId = env('GOOGLE_CALENDAR_ID');
        }

        if (!self::$calendarService) {
            self::$calendarService = new GoogleCalendarService(self::$googleClient);
        }
    }

    /* Function to Get all Calendars */
    public function getAllCalendars() {
        try {
            new self();
            // Get list of calendars
            $calendars = $this->calendarService->calendarList->listCalendarList();

            if (empty($calendars->getItems())) {
                return apiResponse("No Calendars Found", 'error', 404);
            }

            // Return API response
            return apiResponse("Calendars Fetched Successfully", 'success', 200, );
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
    public static function createNewEvent($data) {
        try {
            new self();
            // Define event details
            $event = new GoogleCalendarEvent([
                'summary' => $data->summary,
                'location' => $data->location,
                'description' => $data->description,
                'start' => $data->start,
                'end' => $data->end,
                'reminders' => array(
                    'useDefault' => FALSE,
                    'overrides' => array(
                        array('method' => 'email', 'minutes' => $data->reminder),
                        array('method' => 'popup', 'minutes' =>  $data->reminder),
                    ),
                ),
            ]);
            // Insert event
            $createdEvent = self::$calendarService->events->insert(self::$calendarId, $event);
            return $createdEvent;
        } catch (\Throwable $th) {
            //throw $th;
            return $th->getLine() . $th->getMessage();
        }
    }

    /* Function to create a New Booking */
    public static function getGEventByID(Request $request, $eventID) {
        try {
            $eventCalendar = env('GOOGLE_CALENDAR_ID');
            $googleEvent = self::$calendarService->events->get($eventCalendar, $eventID);
            return apiResponse("Booking fetched Successfully",  'success', 200, $googleEvent);
        } catch (\Throwable $th) {
            dd($th);
            return apiResponse("Error in api",  'success', 500);
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

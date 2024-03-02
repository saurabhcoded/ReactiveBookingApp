<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Services;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller {
    //function to create a booking
    function createBooking(Request $request) {
        //code to create a booking
        try {
            $rules = [
                'bookDate' => 'required|date',
                'bookTime' => 'required',
                'name' => 'required',
                'email' => 'required|email',
                'contact' => 'required|numeric',
                'countryCode' => 'required'
            ];
            $customMessages = [
                'name.required' => 'The name field is mandatory.',
                'slug.unique' => 'The slug has already been taken, please choose another.',
                'mainprice.required|numeric' => 'Main price must be a number.',
                'discountedprice.required|numeric' => 'Discounted price must be a number.',
                'category.required' => 'You must select a category.',
                'language.required' => 'Language is required.',
                'duration.required' => 'Course Duration is required.',
                'thumbnail.required' => 'A thumbnail image is required.',
                'description|content.required' => 'Description and content cannot be empty.'
            ];

            $validator = Validator::make($request->all(), $rules, $customMessages);

            if ($validator->fails()) {
                return apiResponse('Validation failed', "error", 422, $validator->errors());
            } else {
                $body = $request->all();
                $service = Services::find($body['serviceID']);
                $meetingTime = $body['bookDate'] . " " . $body['bookTime'];

                $BookingTitle = $service['name'] . " with " . $body['name'];
                $BookingLocation = "online";
                $BookingDuration = $service['duration'];
                $BookingStart = Carbon::parse($meetingTime)->format('Y-m-d\TH:i:sP');
                $BookingEnd = Carbon::parse($meetingTime)->addMinutes($BookingDuration)->format('Y-m-d\TH:i:sP');

                /* Configuration for Google Calendar Event */
                $GEventConfig = (object)[
                    "summary" => $BookingTitle,
                    "location" => $BookingLocation,
                    "description" => "Meeting with " . $body['name'] . " at " . $meetingTime,
                    'start' => ['dateTime' => $BookingStart, 'timeZone' => 'UTC'],
                    'end' => ['dateTime' => $BookingEnd, 'timeZone' => 'UTC'],
                    "reminder" => "10",
                ];

                /* Configuration for Zoom Meeting */
                $ZoomConfig = (object)[
                    "topic" => $BookingTitle,
                    "type" => 2, // 2 for scheduled meeting
                    "start_time" => $BookingStart, // Use the desired start time in ISO 8601 format
                    "duration" => $BookingDuration, // Meeting duration in minutes
                    "timezone" => "UTC", // Specify the timezone
                    "password" => "", // No password for the meeting
                    "settings" => [
                        "host_video" => true,
                        "participant_video" => true,
                        "join_before_host" => true,
                        "auto_recording" => "local" // "local" for local recording, "cloud" for cloud recording, "none" for no recording
                    ]
                ];
                $ZoomMeeting = ZoomController::createZoomMeeting($ZoomConfig);
                $GoogleEvent = GmeetController::createNewEvent($GEventConfig);
                $body['zoomMeetingID'] = $ZoomMeeting['id'];
                $body['googleEventID'] = $GoogleEvent['id'];
                $body['metadata'] = json_encode(["zoomData" => $ZoomMeeting, "googleData" => $GoogleEvent]);
                $booking = Bookings::create($body);
                return apiResponse("Booking created successfully", 'success', 200, $booking);
            }
        } catch (\Exception $e) {
            return apiResponse($e->getMessage(), "error", 500);
        }
    }

    /* Get All Bookings */
    function getAllBookings() {
        try {
            $bookings = Bookings::with('service')->get();
            return apiResponse("Bookings Fetched Successfully", 'success', 200, $bookings);
        } catch (\Exception $e) {
            return apiResponse($e->getMessage(), "error", 500);
        }
    }

    /* Get All Bookings */
    function getPersonalBookings($bookEmail) {
        try {
            $bookings = Bookings::with('service')->where('email', $bookEmail)->get();
            return apiResponse("Bookings Fetched Successfully", 'success', 200, $bookings);
        } catch (\Exception $e) {
            return apiResponse($e->getMessage(), "error", 500);
        }
    }
}

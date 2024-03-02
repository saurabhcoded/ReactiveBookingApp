<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;

class ZoomController extends Controller {

    public static function getZoomToken() {
        $accountID = env("ZOOM_ACCOUNT_ID");
        $clientID = env("ZOOM_CLIENT_ID");
        $clientSecret = env("ZOOM_CLIENT_SECRET");
        $tokenUrl = 'https://zoom.us/oauth/token';

        /* Data */
        $data = array(
            'grant_type' => 'account_credentials',
            'account_id' => $accountID
        );
        /* Headers */
        $headers = array(
            "Authorization: Basic " . base64_encode($clientID . ':' . $clientSecret),
            "Host: zoom.us"
        );
        /* Response of Curl Command */
        $response = executeCurl($tokenUrl, $data, $headers);
        $result = json_decode($response, true);
        if ($result && isset($result['access_token'])) {
            return $result['access_token'];
        } else {
            return null;
        }
    }

    function isTokenExpired($accessToken) {
        $tokenParts = explode('.', $accessToken);
        if (count($tokenParts) !== 3) {
            return true;
        }
        $payload = base64_decode($tokenParts[1]);
        $tokenData = json_decode($payload, true);

        if (isset($tokenData['exp']) && $tokenData['exp'] < time()) {
            return true;
        }

        return false;
    }


    function updateZoomMeeting(Request $request, $meetingId) {
        $data = $request->all();
        $accessToken = $this->getZoomToken();

        $base_url = 'https://api.zoom.us/v2';
        $update_meeting_url = $base_url . '/meetings/' . $meetingId;

        $headers = array(
            "Content-Type: application/json",
            "Authorization: Bearer " . $accessToken,
        );

        $response = executeCurl($update_meeting_url, $data, $headers, 'PATCH');
        $result = json_decode($response, true);
        if ($result && isset($result['id'])) {
            return apiResponse("MeetingID: " . $meetingId . " Updated Successfully", 'success', 200, $result);
        } else {
            return apiResponse("Failed to update meeting", 'error', 404, array($result, $data, $meetingId));
        }
    }

    /* Readable DateTime Format */
    function readDate($dateString) {
        $dateTime = new DateTime($dateString);
        $humanReadableDate = $dateTime->format('d-M-Y g:i A');
        return $humanReadableDate;
    }

    /* Function to get a Zoom Meeting by ID */
    function getZoomMeeting($meetingId) {
        $accessToken = $this->getZoomToken();

        $base_url = 'https://api.zoom.us/v2';
        $get_meeting_url = $base_url . '/meetings/' . $meetingId;

        $headers = array(
            "Authorization: Bearer " . $accessToken,
        );

        $response = executeCurl($get_meeting_url, [], $headers, 'GET', false);
        $result = json_decode($response, true);

        if (isset($result['id'])) {
            return apiResponse("MeetingID: " . $meetingId . " Data Retrieved Successfully", 'success', 200, $result);
        } else {
            return apiResponse("Failed to retrieve meeting data", 'error', 404, $result);
        }
    }

    /* Function to create a Zoom Meeting */
    public static function createZoomMeeting($data) {
        $accessToken = self::getZoomToken();
        if (empty($accessToken)) {
            return apiResponse('Invalid Access Token', 'error', 400);
        }
        $base_url = 'https://api.zoom.us/v2';
        $headers = array(
            "Content-Type: application/json",
            "Authorization: Bearer " . $accessToken, // Get your access token by following the OAuth 2.0 flow
        );

        $data = json_encode($data);
        $response = executeCurl($base_url . '/users/me/meetings', $data, $headers, 'POST', false);
        $result = json_decode($response, true);

        if ($result && isset($result['id'])) {
            return $result;
        } else {
            return null;
        }
    }

    /* Function to Delete a Zoom Meeting */
    public static function deleteZoomMeeting(Request $request) {
        $meetingId = $request->meetingId;
        $accessToken = self::getZoomToken();
        $baseUrl = 'https://api.zoom.us/v2';
        $endpoint = '/meetings/' . $meetingId;

        $headers = array(
            "Authorization: Bearer $accessToken",
            "Content-Type: application/json",
        );

        $response = executeCurl($baseUrl . $endpoint, [], $headers, 'DELETE');
        $result = json_decode($response, true);

        /* It Gives null in case meeting is deleted so giving the deleted response for the same */
        if ($result) {
            switch ($result['code']) {
                case 3001:
                    return apiResponse($result['message'], 'error', 404);
                case 300:
                    return apiResponse($result['message'], 'error', 404);
                default:
                    return apiResponse("Meeeting Deleted Successfully.", 'success', 200, $result);
            }
        } else {
            return apiResponse("Meeeting Deleted Successfully.", 'success', 200);
        }
        // deleteData($meetingId);
    }
}

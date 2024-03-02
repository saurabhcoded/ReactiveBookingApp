<?php

if (!function_exists('executeCurl')) {
    /**
     * Get JSON Response for API.
     *
     * @param string $message
     * @param string $status
     * @param int $statusCode
     * @param mixed $data
     * @return \Illuminate\Http\JsonResponse
     */
    function executeCurl($url, $data, $headers, $method = 'POST', $stringify = true) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $requestData = $data;
        if ($stringify) {
            $requestData = http_build_query($requestData);
        }

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $requestData);
        } elseif ($method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($ch, CURLOPT_POSTFIELDS, $requestData);
        } elseif ($method === 'PATCH') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
            curl_setopt($ch, CURLOPT_POSTFIELDS, $requestData);
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
            curl_setopt($ch, CURLOPT_POSTFIELDS, $requestData);
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
}

if (!function_exists('apiResponse')) {
    /**
     * Get Response Json for API.
     *
     * @param $message string, $status string, $statusCode integer, $data object
     * @return response()->json([$message, $status, $data], $statusCode)
     */
    function apiResponse($message, $status, $statusCode, $data = null) {
        $responseArray = [
            'message' => $message,
            'status' => $status,
        ];
        if ($data) {
            $responseArray['data'] = $data;
        }
        return  response()->json($responseArray, $statusCode);
    }
}

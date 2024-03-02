<?php

namespace App\Http\Controllers;

use App\Models\Resources;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ResourcesController extends Controller {

    /* ---------------------
        Helper Functions
    ------------------------ */

    /* Function to Send Custom Response */
    public function sendCustomResponse($message, $status, $statusCode, $data = null) {
        return  response()->json([
            'message' => $message,
            'status' => $status,
            'data' => $data
        ], $statusCode);
    }

    /* Get Resource Public Url by Path */
    public static function getResourcePublicUrl($ResourcePath) {
        return 'http://localhost:8000/storage/' . $ResourcePath;
        // return Storage::disk('public')->url($ResourcePath);
    }

    /* Function to get a Resource By ID */
    public function getResourceById($resourceId) {
        $Resource = Resources::find($resourceId);
        if ($Resource) {
            $Resource['public_url'] = $this->getResourcePublicUrl($Resource->path);
        }
        return $Resource;
    }

    /* ---------------------
        Api Functions
    ------------------------ */

    /* Function to get a Resource By ID */
    public function getAllResources() {
        $Resources = Resources::where('status', 'active')->orderBy('created_at', 'desc')->get();
        $Resources->map(function ($resource) {
            $resource['public_url'] = $this->getResourcePublicUrl($resource->path);
            return $resource;
        });
        return $this->sendCustomResponse("Resources Fetched Successfully",  'success', 200, $Resources);
    }

    /* Function to get a Resource By ID */
    public function getSingleResource($resourceID) {
        $Resource = Resources::find($resourceID);
        if ($Resource) {
            $Resource['public_url'] = $this->getResourcePublicUrl($Resource->path);
        }
        return $this->sendCustomResponse("Resource Fetched Successfully",  'success', 200,  $Resource);
    }

    /* Function to Upload a Resource */
    public function uploadResource(Request $request) {
        $validator = Validator::make($request->all(), [
            'resource' => 'required|image:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        // dd($request->all());
        // return;
        if ($validator->fails()) {
            return $this->sendCustomResponse($validator->messages()->first(),  'error', 500);
        }

        $uploadFolder = 'resources';
        $image = $request->file('resource');
        $image_uploaded_path = $image->store($uploadFolder, 'public');

        $image_basename = basename($image_uploaded_path);
        $image__publicurl = $this->getResourcePublicUrl($image_uploaded_path);
        $mime = $image->getClientMimeType();
        $original_name = $image->getClientOriginalName();

        $ImageResource = Resources::create([
            'title' => $original_name,
            'basename' => $image_basename,
            'category' => 'image',
            'type' => $mime,
            'path' => $image_uploaded_path,
            'variants' => json_encode([])
        ]);
        $ImageResource['public_url'] = $image__publicurl;
        return $this->sendCustomResponse('File Uploaded Successfully', 'success',   200, $ImageResource);
    }

    /* Function to Delete a Resource */
    public function deleteResource(Request $request) {
        $validator = Validator::make($request->all(), [
            'resource_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return $this->sendCustomResponse($validator->messages()->first(),  'error', 500);
        }
        $resource = Resources::find($request->resource_id);
        if (!$resource) {
            return $this->sendCustomResponse('Resource not found',  'error', 404);
        }
        // Delete the file from the storage
        $resource_path = $resource->path;
        $resource_exists = Storage::disk('public')->exists($resource_path);
        if ($resource_exists) {
            Storage::disk('public')->delete($resource_path);
            /*
                Delete Multiple files this way
                Storage::delete(['upload/test.png', 'upload/test2.png']);
            */
        } else {
            return $this->sendCustomResponse(
                'Resource not found in storage',
                'error',
                404,
                (object)['path' => $resource_path, 'exists' => $resource_exists]
            );
        }
        $resource->delete();
        return $this->sendCustomResponse('Resource deleted successfully', 'success', 200, (object)['path' => $resource_path, 'exists' => $resource_exists]);
    }
}

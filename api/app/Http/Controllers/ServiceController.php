<?php

namespace App\Http\Controllers;

use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller {
    /* Get All Services */
    public function getAllServices(Request $request) {
        $Services = Services::all();
        $Services = Services::leftJoin('resources', 'services.thumbnail', '=', 'resources.id')
            ->select('services.*', 'resources.path as thumbnail_url')
            ->get();
        $Services->map(function ($service) {
            $service['thumbnail_url'] = ResourcesController::getResourcePublicUrl($service->thumbnail_url);
            return $service;
        });
        return apiResponse("Fetched all services", 'success', 200, $Services);
    }

    // Get Active Services
    public static function getActiveServices() {
        $Services = Services::all();
        $Services = Services::leftJoin('resources', 'services.thumbnail', '=', 'resources.id')
            ->select('services.*', 'resources.path as thumbnail_url')
            ->where('services.status', 'active')
            ->get();
        $Services->map(function ($service) {
            $service['thumbnail_url'] = ResourcesController::getResourcePublicUrl($service->thumbnail_url);
            return $service;
        });
        return apiResponse("Fetched Active services", 'success', 200, $Services);
    }

    /* get Service details by slug */
    public static function getServiceBySlug($serviceslug) {
        $Service = Services::all();
        $Service = Services::leftJoin('resources', 'services.thumbnail', '=', 'resources.id')
            ->select('services.*', 'resources.path as thumbnail_url')
            ->where('services.status', 'active')
            ->where('services.slug', $serviceslug)
            ->first();
        if (isset($Service['thumbnail_url'])) {
            $Service['thumbnail_url'] = ResourcesController::getResourcePublicUrl($Service->thumbnail_url);
        }
        return apiResponse("Fetched Service By Slug", 'success', 200,  $Service);
    }

    /* Function to Create Services */
    public function CreateService(Request $request) {
        try {
            $rules = [
                "name" => 'required',
                "slug" => 'unique:services',
                "mainprice" => 'required|numeric',
                "discountedprice" => 'required|numeric',
                "category" => 'required',
                "language" => 'required',
                "thumbnail" => 'required',
                "duration" => 'required',
                "description" => 'required',
                "content" => 'nullable',
            ];

            $customMessages = [
                'name.required' => 'The name field is mandatory.',
                'slug.unique' => 'The slug has already been taken, please choose another.',
                'mainprice.required' => 'Main price is required.',
                'mainprice.numeric' => 'Main price must be a number.',
                'discountedprice.required' => 'Discounted price is required.',
                'discountedprice.numeric' => 'Discounted price must be a number.',
                'category.required' => 'You must select a category.',
                'language.required' => 'Language is required.',
                'duration.required' => 'Course Duration is required.',
                'thumbnail.required' => 'A thumbnail image is required.',
                'description.required' => 'Description cannot be empty.',
                'content.required' => 'Content cannot be empty.',
            ];

            $validator = Validator::make($request->all(), $rules, $customMessages);

            if ($validator->fails()) {
                return apiResponse('Validation failed', "error", 422, $validator->errors());
            } else {
                $data = $request->all();
                $ServiceCreated = Services::create($data);
                return apiResponse('Service Created Successfully', "success", 200, $ServiceCreated);
            }
        } catch (\Exception $e) {
            return apiResponse($e->getMessage(), "error", 500);
        }
    }

    /* FUnction to Update Services */
    public function UpdateService(Request $request, $serviceID) {
        $rules = [
            "name" => 'required',
            "slug" => 'unique:services,slug,' . $serviceID,
            "mainprice" => 'required|numeric',
            "discountedprice" => 'required|numeric',
            "category" => 'required',
            "language" => 'required',
            "duration" => 'required',
            "thumbnail" => 'required',
            "description" => 'required',
            "content" => 'nullable',
        ];

        $customMessages = [
            'name.required' => 'The name field is mandatory.',
            'slug.unique' => 'The slug has already been taken, please choose another.',
            'mainprice.required' => 'Main price is required.',
            'mainprice.numeric' => 'Main price must be a number.',
            'discountedprice.required' => 'Discounted price is required.',
            'discountedprice.numeric' => 'Discounted price must be a number.',
            'category.required' => 'You must select a category.',
            'language.required' => 'Language is required.',
            'duration.required' => 'Course Duration is required.',
            'thumbnail.required' => 'A thumbnail image is required.',
            'description.required' => 'Description cannot be empty.',
            'content.required' => 'Content cannot be empty.',
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            return apiResponse('Validation failed', "error", 422, $validator->errors());
        } else {
            $data = $request->all();
            $updated = Services::where('id', $serviceID)->update([
                'name' => $request->name,
                'slug' => $request->slug,
                'mainprice' => $request->mainprice,
                'discountedprice' => $request->discountedprice,
                'category' => $request->category,
                'language' => $request->language,
                'thumbnail' => $request->thumbnail,
                'description' => $request->description,
                'content' => $request->content,
            ]);
            return apiResponse('Service Updated Successfully', "success", 200, $updated);
        }
    }

    /* Function to Delete Services */
    public function DeleteService($serviceID) {
        $service = Services::find($serviceID);
        $service->delete();
        return apiResponse('Service Deleted', "success", 200);
    }

    /* Function to Activate Services */
    public function ActivateService($serviceID) {
        $service = Services::find($serviceID);
        if ($service->status == 'active') {
            $service->status = 'inactive';
        } else {
            $service->status = 'active';
        }
        $service->save();
        return apiResponse('Service Activated', "success", 200);
    }
}

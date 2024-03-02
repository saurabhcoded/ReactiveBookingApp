import AxiosAPI from "./axiosInstance";

export async function getAllServices() {
    const response = await AxiosAPI.get('services/all');
    return response;
}

export async function getActiveServices() {
    const response = await AxiosAPI.get('services/active');
    return response;
}


export async function getServiceBySlug(slug) {
    const response = await AxiosAPI.get('services/single/' + slug);
    return response;
}

export async function createNewBooking(data) {
    const response = await AxiosAPI.post('booking/create', data);
    return response;
}
export async function getAllBookings() {
    const response = await AxiosAPI.get('booking/all');
    return response;

}
export async function getPersonalBooking(email) {
    const response = await AxiosAPI.get('booking/mybooking/' + email);
    return response;
}
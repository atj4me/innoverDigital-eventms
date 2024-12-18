import api from  "./api";

/**
 * A Function to get all events with filter. 
 * @todo Filters are not working at the moment. 
 * Need to implemnet based on updated API Doc
 * @param {*} params Optional Parameters to filter the events. 
 * @returns 
 */
export const getEvents = async (params={}) => {
    const response = await api.get("/events", {params});
    return response.data;
};

/**
 * A function to get the  event by id
 * @param number id 
 * @returns 
 */
export const getEvent = async (id) => {
    if ( id === undefined ) return Promise.reject("id is undefined")
    const response = await api.get(`/event/${id}`);
    return response.data;
};

/**
 * A function to add a new event
 * @param {*} data 
 * @returns 
 */
export const addEvent = async (data) => {
    if ( data === undefined ) return Promise.reject("data is empty")
    const response = await api.post(`/event`, {data});
    return response.data;
};
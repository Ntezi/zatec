import axios from "axios";
import {API_KEY} from "./constants";

function getHeader() {
    return {
        'Authorization': `${API_KEY}`,
        'Content-Type': "application/json"
    }
}

export async function get(url) {
    try {
        const response = await axios.get(url, {
            headers: getHeader(),
        });
        return response.data;
    } catch (err) {
        return err.message;
    }
}

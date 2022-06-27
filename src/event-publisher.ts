import { Dispatch } from "redux";

export const createEventPublisher = (dispatch: Dispatch) => (name: string, payload: object) => {
    dispatch({
        type: 'PUBLISH_EVENT',
        data: {
            name,
            payload,
        },
    });
};

import EventBus from './EventBus';

export const EVNETS = {
    USER_LOGIN_SUCCESS:"USER_LOGIN_SUCCESS",
    USER_LOG_OUT:"USER_LOG_OUT"
};

export default new EventBus("g_bus");
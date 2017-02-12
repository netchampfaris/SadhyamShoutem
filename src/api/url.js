const SERVER_URL = 'https://secure-mesa-75051.herokuapp.com';
export default url = {
    LOGIN_URL: SERVER_URL + '/api/subscriber/v1/user/login/',
    LOGOUT_URL: SERVER_URL + '/api/subscriber/v1/user/logout/',
    SIGNUP_URL: SERVER_URL + '/api/subscriber/v1/user/',
    QUESTIONS_URL: SERVER_URL + '/api/quiz/v1/question/',
    SUBMIT_ANSWERS_URL: SERVER_URL + '/api/qresponse/v1/practice_result/'
}
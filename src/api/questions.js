import { getUserApi } from './login';
import url from './url';

function getQuestionsUrl() {
    return getUserApi()
        .then(({user, api_key}) => {
            return `${url.QUESTIONS_URL}?number_of_question=10&username=${user}&api_key=${api_key}`
        });
}

export function getQuestions() {
    return getQuestionsUrl()
        .then(fetch)
        .then(res => res.json());
}
import React, { Component } from 'react';
import {
    StyleSheet,
    WebView,
    View as RNView,
    Dimensions
} from 'react-native';
import {
    NavigationBar,
    Heading,
    Title,
    RichMedia,
    View,
    Button,
    Icon,
    Text
} from '@shoutem/ui';
import { Actions } from 'react-native-router-flux';

import { getQuestions } from '../../api/questions';

export default class Questions extends Component {
    constructor(props) {
        super(props);
        this.questions = [];
        this.state = {
            currentQuestion: {
                number: -1,
                html: this.getHTML(' are loading...', 'Please wait'),
                selectedOption: 'Z'
            }
        }
    }

    getHTML(number, content) {
        return `<!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
            </head>
            <style>
                html {
                    zoom: 0.85;
                    background: #fbfafa;
                    font-size: 20px;
                }
                .card {
                    width: 443px;
                    padding: 20px;
                    overflow: hidden;
                    background: #fff;
                    border-radius: 2px;
                    display: inline-block;
                    position: relative;
                    box-shadow: 0 3px 4px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.2);
                }
            </style>
            <body>
                <div class='card'>
                    <h3>Question ${number}</h3>
                    ${content}
                </div>
            <body>
        </html>`;
    }

    getQuestion(number) {
        const question = this.questions[number - 1];
        return {
            number,
            html: question.questionHTML,
            selectedOption: question.selectedOption
        }
    }

    componentDidMount() {
        getQuestions().then(data => {
            console.log(data);
            this.setupQuestions(data.objects);
            this.showQuestion(1);
        });
    }

    setupQuestions(questions) {
        this.questions = questions.map((q, i) =>
            Object.assign(q, {
                questionHTML: this.getHTML(i + 1, q.question),
                selectedOption: 'Z'
            })
        )
    }

    showQuestion(number) {
        if (number > this.questions.length ||
            number < 1) return;

        const currentQuestion = this.getQuestion(number);
        this.setState({ currentQuestion });
        setTimeout(() => this.refs['WebView'].reload(), 10);
        // setTimeout(() => this.refs['WebView'].reload(), 500);
        // setTimeout(() => this.refs['WebView'].reload(), 1000);
    }

    nextQuestion() {
        const nextIndex = this.state.currentQuestion.number + 1;
        this.showQuestion(nextIndex);
    }

    prevQuestion() {
        const prevIndex = this.state.currentQuestion.number - 1;
        this.showQuestion(prevIndex);
    }

    renderOptions() {
        const options = ['A', 'B', 'C', 'D', 'E'];
        const {selectedOption} = this.state.currentQuestion;

        return (
            <View styleName="horizontal flexible" style={{flex: 0.1}}>
            {
                options.map((opt, i) => {
                    return <Button
                        styleName={"full-width"+(selectedOption==opt ? " dark": "")}
                        key={opt}
                        onPress={this.optionClicked.bind(this, opt)}
                    >
                        <Text>{opt}</Text>
                    </Button>
                })
            }
            </View>
        );
    }

    allQuestionsSolved() {
        return this.questions
            .filter(q => q.selectedOption !== 'Z').length ===
                this.questions.length;
    }

    onPressSubmit() {
        // console.log(this.questions)
        const marksObtained = this.questions
            .filter(q => q.selectedOption === q.correct_ans).length;
        const totalQuestions = this.questions.length;
        console.log(marksObtained, totalQuestions);
        // submitAnswers({
        //     marksObtained,
        //     totalQuestions
        // })
        // .then(console.log);
        
    }

    optionClicked(option) {
        this.questions[this.state.currentQuestion.number - 1].selectedOption = option;
        this.setState({
            currentQuestion: Object.assign({}, this.state.currentQuestion, {
                selectedOption: option
            })
        });
    }

    renderNextPrev() {
        return (
            <View styleName="horizontal flexible" style={{flex: 0.19, borderWidth:1}}>
                {this.renderPrev()}
                {this.renderSubmit()}
                {this.renderNext()}
            </View>
        );
    }

    renderPrev() {
        if(this.state.currentQuestion.number > 1) {
            return <Button styleName="full-width muted"
                onPress={this.prevQuestion.bind(this)}
            >
                <Text>PREV</Text>
            </Button>
        } else {
            return null;
        }
    }

    renderNext() {
        if(this.state.currentQuestion.number < this.questions.length) {
            return <Button styleName="full-width muted"
                onPress={this.nextQuestion.bind(this)}
            >
                <Text>NEXT</Text>
            </Button>
        }
    }

    renderSubmit() {
        if(this.allQuestionsSolved()) {
            return <Button styleName="full-width muted dark"
                onPress={this.onPressSubmit.bind(this)}
            >
                <Text>SUBMIT</Text>
            </Button>
        }
    }


    render() {
        return (
            <View styleName="flexible">
                <NavigationBar
                    centerComponent={<Title>QUESTIONS</Title>}
                />
                
                <WebView
                    ref='WebView'
                    style={styles.webviewWrapper}
                    source={{ html: this.state.currentQuestion.html }}
                />

                {this.renderOptions()}
                {this.renderNextPrev()}
            </View>
        );
    }
}

const {height, width} = Dimensions.get('window');
console.log(height, width)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    webviewWrapper: {
        marginTop: 70,
        height: height,
        width: width,
        borderColor: 'pink',
        borderWidth: 5,
    },
    questions: {
        flex: 1
    }
})
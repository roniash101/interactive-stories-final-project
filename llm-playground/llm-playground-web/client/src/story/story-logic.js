import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppState, useSetAppState } from '../app-state/AppStateProvider';
import { SETTINGS } from '../../settings';
import Characters from './Characters';
import storyConfig from './story-config';

export function useSendMessage() {
    const { messages, status } = useAppState();
    const setAppState = useSetAppState();
    const handleResponse = useHandleStoryResponse();

    const send = useCallback((message, participants, goalProgress, state, onSent) => {

        let loadingType = message.role == 'user' ? 'text-loading' : 'view-loading';
        // let reminder = message.role == 'user' ?
        //     `\n [Reminder: This is a user message (a line said by Lilach), respond to it with the right JSON scheme (that includes characters texts etc.)]`
        //     : `\n [Reminder: This is a system message, respond with {"OK": true}.]`;


        // boolean, if the given message has a "system" role,
        // systemMessageAck should be true and all the other fields should be empty.
        // Otherwise, if the given message has a "user" role,
        // systemMessageAck should be false and the other fields should be generated according to their rules.

        // let reminder = message.role == 'user' ?
        //     `\n [Reminder: This is a user message (a line said by Lilach),
        //     systemMessageAck should be false
        //     and the other fields should be generated according to their rules.]`
        //     : `\n [Reminder: This is a system message,
        //     systemMessageAck should be true
        //     and all the other fields should be empty.]`;

        let reminder = `\n(SYSTEM: The currently present characters in the conversation are: [${participants}])`;

        message.content += reminder;

        console.log("message", message);

        const newMessages = [...messages, message];

        setAppState({ messages: newMessages, status: loadingType });

        fetch(
            `${SETTINGS.SERVER_URL}/story-completions`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(newMessages)
            }
        ).then(response => response.json()
        ).then(data => {
            try {
                let storytellerResponse = data.choices[0].message.content;
                storytellerResponse = JSON.parse(storytellerResponse);

                setAppState({ status: 'idle' });
                handleResponse(newMessages, storytellerResponse, participants, state, goalProgress);
                onSent();

            } catch { err => { throw err } }
        }).catch(err => {
            console.error('Api error. Details: ', err);
            setAppState({ status: 'error' });
        })

    }, [messages]);

    return send;
}

export function useHandleStoryResponse() {
    const setAppState = useSetAppState();

    function handleStoryResponse(messages, response, participants, state, goalProgress) {
        if (!response) return;

        /* 
        properties:
            galitText, smadarText, barakText,
            LilachInnerDialogue, callToAction,
            galitGoalProgress, smadarGoalProgress, barakGoalProgress
        */
        console.log("response", response);

        // handle character's text
        const newChatactersText = {
            Galit: '',
            Smadar: '',
            Barak: ''
        };

        if (response.galitText) {
            newChatactersText.Galit = response.galitText;

            if (state != 'middle' && response.galitText.includes("tickets")) {
                setAppState({
                    state: 'middle',
                    sceneDescription: storyConfig.middleSceneDescription
                });
            }
        }

        if (response.smadarText) {
            newChatactersText.Smadar = response.smadarText;
        }

        if (response.barakText) {
            newChatactersText.Barak = response.barakText;
        }

        // handle goal progress
        let newGoalProgress = { ...goalProgress };
        let isVictory = false;

        if (participants.includes(Characters.Galit.name) && response.galitGoalProgress != undefined && newGoalProgress.Galit != 1) {
            newGoalProgress.Galit = response.galitGoalProgress;
        }

        if (participants.includes(Characters.Smadar.name) && response.smadarGoalProgress != undefined && newGoalProgress.Smadar != 1) {
            newGoalProgress.Smadar = response.smadarGoalProgress;
        }

        if (participants.includes(Characters.Barak.name) && response.barakGoalProgress != undefined && newGoalProgress.Barak != 1) {
            newGoalProgress.Barak = response.barakGoalProgress;
        }

        if (newGoalProgress.Galit == 1 & newGoalProgress.Smadar == 1 && newGoalProgress.Barak == 1) {
            isVictory = true;
        }

        setAppState({
            charactersText: { ...newChatactersText },
            goalProgress: { ...newGoalProgress },
            isVictory
        });

        setTimeout(() => {
            if (response.LilachInnerDialogue && response.callToAction) {
                let newInnerDialogue = response.LilachInnerDialogue;
                if (!isVictory && Math.random() > 0.6) {
                    newInnerDialogue += " " + response.callToAction;
                }

                setAppState({ innerDialogue: newInnerDialogue });
            }
        }, 500)
    }

    return handleStoryResponse;
}

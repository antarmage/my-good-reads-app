import { GoodReadActions } from './../actions/good-reads-actions';
// import { GoodReadState, initialState } from './good-reads.state';
import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import { AppState } from '../app.state';

export const initialState: AppState =  {
    readsCollection: null,
    operationMsg: null
}

export const reducer = (state: AppState = initialState, { type, payload }: Action) => {
    let newState: AppState;
    let findIndexToReplace;
    switch (type) {
        case GoodReadActions.FETCH_ALL_READS_SUCCESS:
            newState = _.cloneDeep(state);
            newState.readsCollection = payload;
            break;
        case GoodReadActions.FETCH_ALL_READS_FAILURE:
            newState = state;
            newState.operationMsg = 'Fetching reads from backend failed';
            break;
        case GoodReadActions.ADD_NEW_READ_SUCCESS:
            newState = _.cloneDeep(state);
            newState.readsCollection.push(payload);
            break;
        case GoodReadActions.EDIT_READ_SUCCESS:
            newState = _.cloneDeep(state);
            findIndexToReplace = _.findIndex(newState.readsCollection, (read) => read.id === payload.id);
            newState[findIndexToReplace] = payload;
            break;
        case GoodReadActions.MARK_AS_READ_SUCCESS:
            newState = _.cloneDeep(state);
            findIndexToReplace = _.findIndex(newState.readsCollection, (read) => read.id === payload.id);
            newState[findIndexToReplace] = payload;
            break;
        case GoodReadActions.MARK_AS_UNREAD_SUCCESS:
            newState = _.cloneDeep(state);
            findIndexToReplace = _.findIndex(newState.readsCollection, (read) => read.id === payload.id);
            newState[findIndexToReplace] = payload;
            break;
        default:
            newState = state;

    }
    return newState;
}
export default (state, action) => {
    switch (action.type) {
        case 'GET_CLIENT_ID':
            return {
                ...state,
                clientId: action.payload[0]._id,
            }
        case 'GET_CLIENT_VIDEO':
            return {
                ...state,
                video: action.payload[0].video,
            }
        case 'GET_CLIENT_FORM':
            return {
                ...state,
                form: action.payload[0].form,
            }
        default:
            return state;
    }
}

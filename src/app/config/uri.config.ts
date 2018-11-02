export const URI_CONFIG = {
    AS_HOST_URI: 'localhost:5000',
    /* base api url */
    BASE_AUTH: '/api/auth',
    BASE_USER_API: '/api/user',
    BASE_CONTRACT_API: '/api/contract',
    BASE_CANDIDATE_API: 'api/candidate',
    BASE_CITIZEN_API: '/api/citizen',
    BASE_BLOCKCHAIN_API: '/api/blockchainAccount',
    BASE_BALLOT_API: '/api/ballot',
    BASE_EA_API: '/api/ea',
    /* user url */
    GET_USER_HASH_URL: '/getUserHash',
    AUTH_URL: '/login',
    GET_USER_INFO_URL: '/getUserInfo',
    CHANGE_PASSWORD: '/change-password',
    /* candidate url */
    CANDIDATE_LIST_URL: '/list',
    GET_CANDIDATE_BY_ID_URL: '/getCandidateById',
    CREATE_CANDIDATE_URL: '/create',
    /* contract url */
    IS_ACCOUNT_UNLOCKED_URL: '/isAccountUnlocked',
    CREATE_CANDIDATE_LIST_URL: '/createCandidateList',
    VOTING_URL: '/voting',
    VOTING_LIST_URL: '/votingList',
    VOTE_RESULT_BY_ID_URL: '/voteResult/:id',
    VOTE_STATUS_URL: '/voteStatus',
    GET_BLOCK_URL: '/getBlock',
    /*citizen url*/
    CITIZEN_BY_ID: '',
    CITIZEN_GENERATE_PASSWORD: '/postGenerateNewPassword',
    CITIZEN_GENERATE_SYSTEM_ACCOUNT: '/generateUserAccount',
    CITIZEN_TOTAL: '/total',
    /* Ballot url */
    FINALIZE_BALLOT: '/finalize',
    SELECTED_CANDIDATES: '/selected-candidates',
    BALLOT_PHASES: '/get-ballot-phases',
    DISPLAY_PHASES: '/get-display-phases',
    GET_TxRECEIPT: '/getTxReceipt',
    /* Blockchain account API */
    GET_VOTER_ADDRESS: '/getAddress'
};

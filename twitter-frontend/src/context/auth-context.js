import React from 'react'

export default React.createContext({
    token: '',
    accountID: '',
    login: (token, accountID) => { },
    logout: () => { }
})
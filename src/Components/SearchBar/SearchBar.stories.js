import React from 'react'
import SearchBar from './SearchBar'

export default {
    title: 'SearchBar',
    component: SearchBar,

}

export const Small = () => <SearchBar size='small' placeholder='small' />
export const Medium = () => <SearchBar size='medium' placeholder='medium' />
export const Large = () => <SearchBar size='large' placeholder='large' />

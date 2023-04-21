import React from 'react';
import { View, Text, Pressable } from 'react-native';
import SearchButton from '../../components/searchButton'

// import { Container } from './styles';

function pressHandler() {

}

const SearchScreen = ({ navigation }) => {
    return (
            <SearchButton navigation={navigation}/>
    )
}

export default SearchScreen;

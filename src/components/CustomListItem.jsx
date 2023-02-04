import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            // chatMessages?.[0]?.photoURL ||
            'https://avatars.githubusercontent.com/u/30511472?v=4',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: 800}}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          this is a chat box this is a chat box this is a chat box
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

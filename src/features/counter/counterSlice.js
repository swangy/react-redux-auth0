import { createSlice } from '@reduxjs/toolkit';
import gql from 'graphql-tag';
import { apolloClient } from '../../utils/graphqlConfig';

export const slice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to 'mutate' the state. It doesn't actually
      // mutate the state because it uses the immer library, which detects
      // changes to a "draft state" and produces a brand new immutable state
      // based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
      apolloClient.mutate({
        mutation: gql`
          mutation upsertUser($user:InputUser!) {
            upsertUser(user:$user) {
              userId
              userFullname
              userAvatar
              userRoles
            }
          }
        `,
        variables: {
          user: {
            userFullname: 'My Name',
            userAvatar: 'Avatar URL here',
            userEmail: 'Test Email',
            userEmailVerified: 1
          },
        },
        fetchPolicy: 'no-cache',
      }).then((response) => {
        console.log(response.data);
        // return response.data.upsertUser;
      });
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload.amount;
    },
  },
});

export const selectCount = state => state.counter.value;
export const { increment, decrement, incrementByAmount } = slice.actions;

export default slice.reducer;

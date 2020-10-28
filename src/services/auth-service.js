import ConnectyCube from 'react-native-connectycube';
import config from '../config';

const signInCC = async (userid, token1, sesh_token) => {

  // console.log(userid, token1)  
  try {
      ConnectyCube.login(
        {
          login: userid,
          password: token1,
        }
      ).then((user)=> {
        console.log("logged in NEW METHOD *** UserID: ", user.id);
        return user;
      })
      .catch((error) => {console.log(error)})
      .then((user) => {
        const token = ConnectyCube.service.sdkInstance.session.token;
        console.log("CC session token is: ", token);
        return [user, token];
      })
      .then( (arr) => {
        ConnectyCube.chat.connect({
          userId: arr[0].id,
          password: arr[1]
        });
      })
      .catch((error) => {console.log(error)});
      //console.log(json);
      
  } catch (error) {
      console.error(error)
  }
  
}

export default class AuthService {
  init = () => ConnectyCube.init(...config);

  loginWithToken = (token, userId) => {
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession()
        .then((session) => {signInCC(userId, token, session.token)})
        // .then((token2) => 
        //   ConnectyCube.chat.connect({
        //     userId: userId,
        //     password: token2
        //   }),
        // )
        .then(resolve)
        .catch(reject);
    });
  };

  login = user => {
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession(user)
        .then(() =>
          ConnectyCube.chat.connect({
            userId: user.id,
            password: user.password,
          }),
        )
        .then(resolve)
        .catch(reject);
    });
  };

  logout = () => {
    ConnectyCube.chat.disconnect();
    ConnectyCube.destroySession();
  };
}

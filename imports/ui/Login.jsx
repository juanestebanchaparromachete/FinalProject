import React, {Component, PropTypes} from 'react';

export default class Login {
  render(){
    return(
      <div>
        <template name="register">
          <form>
            <input type="email" name="registerEmail"/>
              <input type="password" name="registerPassword"/>
                <input type="submit" value="Register"/>
          </form>
        </template>
      </div>
    );
  }
}
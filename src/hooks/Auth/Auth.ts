import { useState } from 'react';

const AuthHook = (): any => {
  const [auth, setAuth] = useState(false);
  return { auth, setAuth };
};

export default AuthHook;

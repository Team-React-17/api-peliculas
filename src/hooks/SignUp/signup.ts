import { useState } from 'react';

const SignUpHook = (): any => {
  const [error, setError] = useState({
    username: false,
    email: false,
    password: false
  });
  const [msg, setMsg] = useState('');
  return { error, setError, msg, setMsg };
};

export default SignUpHook;

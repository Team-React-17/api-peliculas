import { useState } from 'react';

const LoginHook = (): any => {
  const [error, setError] = useState({ email: false, password: false });
  const [msg, setMsg] = useState('');

  return { error, setError, msg, setMsg };
};

export default LoginHook;

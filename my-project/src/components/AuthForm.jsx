import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <TextField
          margin="normal"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAuth} sx={{ mt: 2 }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
        <Button
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{ mt: 2 }}
        >
          {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthForm;

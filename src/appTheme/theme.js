// src/theme.js

const Colors = {
  primary: '#4A90E2', // Soft Blue
  secondary: '#50E3C2', // Soft Green
  background: '#F5F7FA', // Light Gray (for a clean and modern background)
  textPrimary: '#333333', // Dark Charcoal for strong, readable text
  textSecondary: '#000000', // Highlighted Black for secondary text
  borderColor: '#D6DCE5', // Light Gray for subtle borders
  buttonBackground: '#4A90E2', // Soft Blue matching primary
  buttonText: '#FFFFFF', // White for contrast on buttons
  inputBackground: '#FFFFFF', // White for inputs
  inputBorder: '#D6DCE5', // Light Gray for input borders
  inputText: '#333333', // Dark Charcoal for input text
  logoutButtonBackground: '#FF6F61', // Soft Coral Red for logout button
  iconColor: 'Black',
};

const Typography = {
  heading1: {
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.textPrimary,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: Colors.textPrimary,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    color: Colors.textSecondary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    color: Colors.textPrimary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonText,
  },
};

const Components = {
  button: {
    backgroundColor: Colors.buttonBackground,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: Colors.inputText,
  },
};

export default {
  Colors,
  Typography,
  Components,
};

  //  const router=useRouter();

//   const [showSignup, setShowSignup] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   //==========signup================
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("");

//  //==========login==================
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // validation messages
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   // ----------------- SIGNUP VALIDATION -----------------
//   const validateSignupForm = () => {
//     const newErrors: { [key: string]: string } = {};  //index signature(explicit type-casting) i.e. an obj can hv n number of key-val pairs only of str data-type

//     if (!username.trim()) {
//       newErrors.username = "Username cannot be empty";
//     }

//     // regex for email validation
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.match(emailPattern)) {
//       newErrors.email = "Enter a valid email address";
//     }

//     // password must be min 8 chars & 1 special char
//     if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       newErrors.password =
//         "Password must be at least 8 chars long and contain a special character";
//     }

//     if (!userType) {
//       newErrors.userType = "Please select a user type";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; //["username","email",etc]
//   };

//   const handleSignup = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateSignupForm()) {
//         alert("Woahh, signup successful!!");

//       if (userType === "handyman") {
//         router.push("/handyDashboard");
//       } 
//       else if (userType === "customer") {
//         router.push("/clientDashboard");
//       }
//     }
//   };

  // // ----------------- LOGIN VALIDATION -----------------
  // const validateLoginForm = () => {
  //   const newErrors: { [key: string]: string } = {};

  //   // simple regex for emails
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!loginEmail.match(emailPattern)) {
  //     newErrors.loginEmail = "Enter a valid email address";
  //   }

  //   if (loginPassword.length < 6) {
  //     newErrors.loginPassword = "Password must be at least 6 characters long";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleLogin = (e: React.FormEvent) => {
  //  e.preventDefault();
  //   if (validateLoginForm()) {
  //     alert("Woahh, login successful!!");
      
  //     router.push("/handyDashboard")
  //     // if (userType === "handyman") {
  //     //   router.push("/handyDashboard");
  //     // } 
  //     // else if (userType === "customer") {
  //     //   router.push("/clientDashboard");
  //     // }
  //   }
  // };
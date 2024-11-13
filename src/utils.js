export async function fetchGithubUsername() {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      acc[name] = value;
      return acc;
    }, {});
  
    const token = cookies['auth_token'];
    if (!token) {
      return null;
    }
  
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`
      }
    });
  
    if (!response.ok) {
      console.error('Failed to fetch user data'); // Debugging line
      return null;
    }
  
    const data = await response.json();
    return data.login;
  }
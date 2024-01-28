/**
 * Asynchronously loads subjects data from a specified API endpoint.
 *
 * This function sends a GET request to the server to retrieve the subjects data.
 * The server is expected to respond with a JSON object containing the subjects data.
 *
 * @async
 * @function
 * @returns {Promise<Object>} A Promise that resolves to a JSON object containing the subjects data.
 * @throws {Error} If there's an error during the fetch operation, an Error will be thrown.
 *
 * @example
 * loadSubjects().then(data => console.log(data)).catch(error => console.error(error));
 */
async function loadSubjects() {
  const url = 'http://localhost:8080/api/v1/students/subjects';
  const token = localStorage.getItem('token');
  const subjects = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return await subjects.json();
}

/**
 * Asynchronously loads user data from a specified API endpoint.
 *
 * @async
 * @function
 * @returns {Promise<Object>} A promise that resolves to the user data in JSON format if the request is successful.
 * @throws Will log an error message with the status code if the request is not successful.
 *
 * @example
 * loadUser().then(user => console.log(user)).catch(error => console.error(error));
 */
async function loadUser() {
  const token = localStorage.getItem('token');
  const url = 'http://localhost:8080/api/v1/students';

  const user = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (user.ok) {
    return user.json();
  } else {
    console.error(`Error:${user.status}`);
  }
}

/**
 * Asynchronously deletes a subject and updates the state of the application.
 *
 * @async
 * @function
 * @param {Object} currentSubject - The current subject to be deleted.
 * @param {Function} setCurrentSubject - Function to set the current subject.
 * @param {Function} setSubjects - Function to set the list of subjects.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful, false otherwise.
 * @throws Will throw an error if the fetch operation fails.
 *
 * @example
 * deleteSubject(currentSubject, setCurrentSubject, setSubjects)
 *   .then(success => console.log(success ? 'Deletion successful' : 'Deletion failed'))
 *   .catch(error => console.error(error));
 */
const deleteSubject = async (currentSubject, setCurrentSubject, setSubjects) => {
  const token = localStorage.getItem('token');
  const url = `http://localhost:8080/api/v1/students/subjects/${currentSubject.subId}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    const updatedSubjects = await response.json();
    setSubjects(updatedSubjects);
    if (updatedSubjects.length > 0) {
      setCurrentSubject(updatedSubjects[0]);
    } else {
      setCurrentSubject('');
    }
    return true;
  }
  return false;
};

/**
 * Clears the local storage, logs the user out, and redirects to the login page.
 * @returns {boolean} Returns true if the function executes successfully.
 */
function logout() {
  localStorage.clear();
  // Redirect to the login page
  window.location.href = '/login';
  console.log('logged user out');
  return true;
}

export { loadSubjects, loadUser, deleteSubject, logout };

import { useState } from "react";

import { Header } from "../../components/Header";
import { ItemList } from "../../components/ItemList";
import background from "../../assets/background.png";

import "./styles.css"

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleFetchData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    console.log(newUser);
    if(newUser.name) {
      const {avatar_url, name, bio, login } = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length) {
        setRepos(newRepos);
      };
    };
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={background} className="background" alt="Background"></img>
        <div className="info">
          <div>
            <input name="user" onChange={event => setUser(event.target.value)} placeholder="@username"></input>
            <button onClick={handleFetchData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <div className="profile">
              <img 
                src={currentUser.avatar_url} className="profile-img" 
                alt="profile image" 
              />
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
          ) : null}
          {repos?.length ? (  
            <>
              <hr />
              <div>
                <h4>Repositórios</h4>
                {repos.map(repo => (
                  <ItemList 
                    key={repo.id}
                    title={repo.name} 
                    url={repo.html_url}
                    description={repo.description}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;

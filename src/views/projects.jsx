import ProjectCards from '../components/project-cards';

const Projects = () => {
  return (    
      <div className='content-wrapper projects-line'>
        
        <h2 id='projects'>Projects</h2>
        <p>Explore some of the exciting projects I’ve worked on! Each project showcases my skills in React, JavaScript, styling, etc. and my passion for building user-friendly applications.</p>

        <ProjectCards />

        
        <p>For more projects and code, visit my <a href='https://github.com/cweave' rel='noreferrer noopener' target='_blank' title='view existing repositories on Github'>Github Portfolio</a>.</p>
      </div>
  );
}

export default Projects;

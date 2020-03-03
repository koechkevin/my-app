
import {faChevronRight, faEnvelope, faMapMarkerAlt, faPhone} from '@fortawesome/pro-regular-svg-icons';
import { Col, Row, Typography } from 'antd';
import React, {FC, ReactNode, useEffect} from 'react';
import {connect} from 'react-redux';
import {useMedia} from 'react-use';
import {Dispatch} from 'redux';

import { Icon } from '../components';
import constants from '../redux/constants';
import styles from './Resume.module.scss';

const { Title, Paragraph, Text } =Typography;

interface Skill {
  name: string;
  description: string;
}

interface OverviewProps {
  title: string;
  description: string;
  skills: Skill[];
}

const SkillsView: FC<Skill> = (props) => {
  const { description, name } = props;
  return(<div style={{ marginBottom: 16 }}>
    <Text strong style={{ marginBottom: 16 }}>{name}</Text>
    <br />
    <Text>{description}</Text>
    <br />
  </div>);
};

interface EducationProp {
  school: string;
  startDate: string;
  description:string;
  endDate: string;
}

const Education: FC<{educationList: EducationProp[];}> = (props) => {
  const {educationList} = props;
  return (
    <div style={{ padding: 16 }}>
    <Row style={{ marginBottom: 16 }}><Text strong style={{ fontSize: 16, color: '#1d1d1d'}}>Education</Text></Row>
      {
        educationList
          .map((education: EducationProp, index: number) => (
            <div key={index}>
              <Text strong>{education.school}</Text>
              <Paragraph>{education.description}</Paragraph>
              <Text strong style={{ color: '#565656'}}>
                <i>{education.startDate}</i></Text>
              {'-'}
              <Text strong style={{ color: '#565656'}}>
                <i>{education.endDate}</i></Text>
            </div>
          ))
      }
  </div>
  )
};

interface Work {
  organization: string;
  startDate: string;
  endDate: string;
  role: string;
  description: string;
}

interface WorkProps {
  workList: Work[];
}

const WorkExperience: FC<WorkProps> = (props) => {
  const { workList } = props;
  return (<div style={{ padding: 16 }}>
    <div style={{ padding: '16px 0' }}>
      <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>Work Experience</Text>
    </div>
    {
      workList.map((work: Work, index: number) => (
        <div style={{ display: 'flex', flexDirection: 'column'}} key={index}>
          <Text strong style={{ color: '#1d1d1d', fontSize: 18 }}>{work.role}</Text>
          <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>{work.organization}</Text>
          <Row style={{ fontSize: 16, padding: '8px 0'}}>
            <Text>{work.startDate}</Text> - <Text>{work.endDate}</Text>
          </Row>
          <Paragraph>{work.description}</Paragraph>
        </div>
      ))
    }
  </div>);
};

interface AchievementsProps {
  achievements: string[];
}
const Achievements: FC<AchievementsProps> = (props) => {
  const { achievements } = props;
  return(<Row style={{ padding: 16 }}>
    <div style={{ padding: '16px 0' }}>
      <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>Achievements</Text>
    </div>
    <ul>
      {
        achievements.map((each: string, index: number) => (<li key={index}><Text>
          {each}
        </Text></li>))
      }
    </ul>
  </Row>);
};

const Overview: FC<OverviewProps> = (props) => {
  const { title, description, skills } = props;
  const education = [{
    school: 'Maseno University', startDate: '2012', endDate: '2015', description: 'Bachelor’s degree in Mathematics and Computer Science.',
  }]
  return (
    <Row className={styles.overview}>
      <Col className={styles.header}>
        <Title style={{ fontSize: 16, margin: 0 }} level={4}>{title}</Title>
      </Col>
      <Col><Paragraph style={{ padding: 16, color: '#565656' }}>{description}</Paragraph></Col>

      <Row style={{ padding: 16, width: '100%' }} gutter={12}>
        <Col sm={8}>
          <Text style={{ fontSize: 16 }} strong>Skills & Technologies</Text>
        </Col>
        <Col sm={16}>
          {
            skills.map((skill: Skill) => (<SkillsView key={skill.name} {...skill}/>))
          }
        </Col>
      </Row>

      <Education educationList={education} />
  </Row>);
};

interface RefereeProps {
  name: string;
  jobTitle: string;
  organization: string;
  email?: string;
  mobile?: string;
}

const Referees: FC<{ references: RefereeProps[]}> = (props) => {
  const { references } = props;
  return (<div style={{ padding: 16 }}>
    <div style={{ padding: '16px 0' }}>
      <Text strong style={{ color: '#1d1d1d', fontSize: 16 }}>Referees</Text>
    </div>
    <ol>
    {
      references.map((referee: RefereeProps, index: number) => (<li style={{ margin: '16px 0'}} key={index}>
        <Col><Text strong style={{ color: '#1d1d1d', fontSize: 14 }}>{referee.name}</Text></Col>
        <Col>
          <Text style={{ fontSize: 16 }}><i>{referee.jobTitle}</i></Text>
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center'}}>
          <Icon icon={faMapMarkerAlt}/>
          <Text><i>{referee.organization}</i></Text>
        </Col>
        {referee.mobile &&
        <Col style={{ display: 'flex', alignItems: 'center'}}>
            <Icon icon={faPhone}/><Text>{referee.mobile}</Text>
        </Col>}
        <Col style={{ display: 'flex', alignItems: 'center'}}>
          <Icon icon={faEnvelope}/><Text>{referee.email}</Text>
        </Col>
      </li>))
    }
    </ol>
  </div>);
}

interface ResumeProps {
  handlePageTitle: (pageTitle: string | ReactNode) => void;
}

const Resume: FC<ResumeProps> = (props) => {
  const { handlePageTitle } = props;

  const isDesktop: boolean = useMedia('(min-width: 692px)');
  const title = 'Software Engineer, Full Stack';

  const pageTitle: ReactNode = (
    <Row style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', overflow: 'hidden'}}>
      <Text ellipsis strong style={{ color: '#1d1d1d', fontSize: 20}}>Kevin Koech</Text>
      {isDesktop && <Icon icon={faChevronRight} />}
      {isDesktop && <Text ellipsis>{title}</Text>}
    </Row>
  );

  useEffect(() => {
    handlePageTitle(pageTitle);
  }, [handlePageTitle, pageTitle]);
  const skills: Skill[] = [
    { name: 'Leadership', description: 'Strong leadership skills, Leading teams of 5 - 8 developers'},
    {name: 'Software Development', description: '2 years experience developing web applications.'},
    {name: 'Languages', description: 'JavaScript, TypeScript, Python'},
    {name: 'Frameworks and Libraries', description:'Node (t/j)s, React, Redux, Express, Sequelize, Angular 8, Ant Design, React Storybook, Python(Django/Flask)'},
    {name: 'Others', description: ' PostgreSQL, mySQL, sqlite, Firebase(backend as a service), HTML, CSS, SCSS and Version Control(Git).'},
  ];
  const description = `
    I am passionate about systems and their inner workings. I enjoy creating things that make work easier.
    As a developer, I have experience building backend APIs (Node + Express) backed by SQL or NoSQL databases, and consuming them with React or Angular client-side web applications. I also have experience in building serverless applications using firebase backend service writing quality cloud functions while using realtime database and firestore as data store.
    Even though I have used both functional and object-oriented programming, I gravitate more towards the latter (OOP) due to its capacity to promote scalability. I also used Test-Driven-Development (TDD) in most of my projects with Jest, Enzyme, Mocha, and Chai for unit and integration testing and Cypress for End-to-end tests.

In addition to understanding the entire software development life cycle, I am also exposed to agile methodologies that enforce continuous delivery and allow distributed / remote collaboration. I am conversant with version control with my preferred system being git. Since I am self-driven, I flourish when working alone or in teams. My academic background made me appreciate and develop an interest in reading algorithms and using data structures to model real-life problems and develop solutions for them
    `;

  const workList: Work[] = [{
    organization: 'Aerotage Design Group', role: 'Frontend Software Developer', description:`As a sub contractor for Aerotage Design Group (South Carolina), I work in a team of distributed developers to build an application intended to be a game changer in human resource management. As a react developer.
I build UI library reusable components intended to be used across the various portals of the company with Typescript as the language of choice.
I map design mockups to actual responsive UI pages to achieve the desired user experience.
I review peer's code on git (bitbucket) and provide actionable feedback on their implementation.
Some of the notable features I have contributed to are -:Implementing authentication workflow, threading in chats, uploading a resume and cover letter, user entering manually filling resume data.
By following Test driven development, I write unit tests for any new feature added using jest and Enzyme.
Stacks, tools, technologies, languages -: React, Typescript, Jira, Bitbucket, Slack, npm.
`, startDate: 'September 2019', endDate: 'March 2016',
  }, {
    organization: 'Andela Kenya',
    startDate: 'August 2018',
    endDate: 'October 2019',
    role: 'Software Engineer',
    description: `As part of various teams working on projects as a full stack software developer using Typescript/Javascript language frameworks.`,
  }, {
    organization: 'ICT - Authority Kenya', role: 'Presidential Digital Talent Management Trainee.', description: `My job entailed overseeing delivery of digital literacy program gadgets to public primary schools in Nandi County, knowledge transfer to teachers, and conducting school readiness for ICT. I also was placed in the office of the Director of public prosecution to provide a digital solution in the ICT department.`,
    startDate: 'July 2016', endDate: 'January 2018',
  }, {
    organization: 'Mumias Sugar Company', role: 'Management Trainee', startDate: 'September 2014', endDate: 'December 2014', description: `At Mumias Sugar, it was more of a learning process and an introduction to industry. I was in the finance and ICT department where I learnt about the SAP system software and aided in provision of support in the ICT department. I was also involved in digitization of records in the finance department.`,
  }];

  const achievements: string[] = [
    'As a developer building a travel management tool, I was the first developer to have my code in 80% of the files in the codebase within 2 months despite joining the team 3 months late. Higher onboarding rate.',
    'Despite having never worked with angular before, I joined a team and made an instant impact opening 40 pull requests of features and priority bugs within 2 months. An average of one pull request per day 14 times better than a bare minimum of 1 PR per sprint of 2 weeks. Fast learning curve.',
  'I took part in mentoring 6 developers who had never interacted with Javascript before. We built the application together as their technical team lead using React JS. 5 of them are now React Js developers who are out making an impact in the world. Community Servant and Leader.'];

  const references: RefereeProps[] = [
    {name: 'David Gaynor', email: 'runnedrun@gmail.com', organization: 'Andela', jobTitle: 'Director of Learning Technology.'},
    { name: 'Anna Simms', email: 'anna.lingggui.ca',
      organization: 'Aerotage Design Inc', jobTitle: 'Product Manager', mobile: '+1 (740) 409-1212'},
    {name: 'Gwen Waswa', mobile: '+254 722 485 180', email: 'gwen.waswa@ict.go.ke',
      organization: 'ICT Authority', jobTitle: 'Senior capacity development coordinator partnership, innovation and capacity development.'},
  ];
  return (
    <Row>
    <Overview description={description} title={title} skills={skills}  />
    <WorkExperience workList={workList} />
    <Achievements achievements={achievements}/>
    <Referees references={references} />
  </Row>
  )
};

const mapStateToProps = ({ global }: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlePageTitle: (pageTitle: string | ReactNode) =>
    dispatch({ type: constants.HANDLE_PAGE_TITLE, payload: pageTitle}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Resume);

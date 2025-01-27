CREATE TABLE task( task_id serial PRIMARY Key, task_name VARCHAR(256), description text, points int, restrictions text, repititions int, team boolean );
CREATE TABLE completion ( completion_id serial PRIMARY KEY, person_id integer REFERENCES person(person_id), task_id integer REFERENCES task(task_id), comment varchar(256), link varchar(256) );
DROP TABLE task;

INSERT INTO task (task_name, description, points, restrictions, repititions, team) VALUES 
('Group Blog', 'Write a blog as a group. Use one of the following prompts: 1) Creative Blocks: How to Overcome + Transform Them into Opportunity 2) Creativity in the Digital Age 3) Daily Habits of Creative People', 100, '100 points per team. You do this once as a group.', 1, true),
('Photo with AS sign', 'Change the sign and take a team photo in front of it. Tag Actual Size on social media.', 50, '50 points per team. You do this once as a group.', 1, true),
('Wings w/ Bob', 'Eat wings with Bob. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Bob', 1, true),
('Coaches w/ Addision', 'Go to Coaches with Addison. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Addison', 1, true),
('Board game w/ Alexander', 'Play a board game with Alexander. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Alexander', 1, true),
('Barcelona Wine Bar w/ Clare', 'Go to Barcelona Wine Bar with Clare. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Clare', 1, true),
('Cecily’s book club', 'Go to Cecily’s book club. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Cecily', 1, true),
('Stickball w/ Eric', 'Play Stickball with Eric. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Eric', 1, true),
('Dress like Joe', 'Dress like Joe for a day. Take a photo and tag Actual Size on social media. +100 points if you shave your head - YOU CAN ONLY DO THIS ONCE.', 50, '50 points per person. Every team member has the opportunity to do this once. * Excludes Joe', 1, false),
('Kevin’s ultimate frisbee game', 'Go to one of Kevin’s ultimate frisbee games. +10 points if you make a sign. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Kevin', 1, true),
('Chili’s w/ Larissa', 'Go to Chili’s with Larissa. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Larissa', 1, true),
('Speakeasy w/ Mary', 'Go to the Speakeasy with Mary. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Mary', 1, true),
('Get a drink w/ Michael', 'Get a drink with Michael in the South Side. Take a photo and tag Actual Size on social media.', 50, '50 points per team. Every team has an opportunity to do this once. * Excludes Michael', 1, true),
('Lunch w/ Mike', 'Eat lunch with Mike. Take a photo and tag Actual Size on social media.', 50, '50 points per person. Every team member has the opportunity to do this once. * Excludes Mike', 1, false),
('AIGA Pittsburgh event', 'Attend an AIGA Pittsburgh event. Take a photo and tag Actual Size on social media.', 30, '30 points per person. Everyone has an opportunity to do this once.', 1, false),
('Go to Rival', 'Go to Rival. Tag Actual Size.', 30, '30 points per person. Everyone has an opportunity to do this once.', 1, false),
('Go to Blue Sky', 'Go to Blue Sky. Tag Actual Size.', 30, '30 points per person. Everyone has an opportunity to do this once.', 1, false),
('Go to Jack & Ginger', 'Go to Jack & Ginger. Tag Actual Size.', 30, '30 points per person. Everyone has an opportunity to do this once.', 1, false),
('Photo at The Terminal', 'Take a photo at The Terminal. Tag Actual Size.', 25, '25 points per person. Everyone has an opportunity to do this once.', 1, false),
('Photo at CMU', 'Take a photo on CMU’s campus. Tag Actual Size.', 25, '25 points per person. Everyone has an opportunity to do this once.', 1, false),
('Photo at Acrisure sign', 'Take a photo of the Acrisure sign. Tag Actual Size.', 25, '25 points per person. Everyone has an opportunity to do this once.', 1, false),
('Photo at Foundmore sign', 'Take a photo of the Foundmore sign. Tag Actual Size.', 25, '25 points per person. Everyone has an opportunity to do this once.', 1, false),
('AS book club', 'Attend an Actual Size book club. You have to (at least pretend to have) read the book.', 20, '20 points per person per meeting.', 1, false),
('Eric-recommended movie', 'Watch a movie Eric recommended.', 20, '20 points per person. Everyone has an opportunity to do this once.', 1, false),
('Download Virtual Bar', 'Download the Virtual Bar app and make an account.', 20, '20 points per person. Everyone has an opportunity to do this once.', 1, false),
('Spotify blend playlist', 'Make a Spotify blend playlist with your team. Play it over the speakers.', 20, '20 points per team. Every team has an opportunity to do this once.', 1, true),
('AS business card', 'Give an Actual Size business card to someone who is not a coworker. Take a photo. Points will be granted every time this is done.', 10, '40 points per person. (You can give out 4 business cards.)', 4, false),
('Photo w/ AS hat', 'Take a photo wearing an Actual Size baseball hat. Post it on social media and tag Actual Size.', 10, '10 points per person.', 1, false),
('AS LinkedIn banner', 'Update your LinkedIn banner to an Actual Size-themed image.', 10, '10 points per person.', 1, false),
('Give LinkedIn recommendation', 'Give a LinkedIn recommendation to a coworker. Points will be granted every time this is done.', 10, '150 points per person. (You can do this 15 times, it excludes yourself.)', 15, false),
('Get LinkedIn recommendation', 'Get a LinkedIn recommendation from someone outside of Actual Size. Points will be granted every time this is done.', 10, '50 points per person. (You can do this 5 times.)', 5, false),
('AS newsletter', 'Register for the Actual Size newsletter.', 10, '10 points per person.', 1, false),
('Perspective Quiz', 'Take the Perspective Quiz and share your results on social media.', 10, '10 points per person.', 1, false),
('AS content on LinkedIn', 'Share Actual Size content on LinkedIn via Employee Advocacy. 3 opportunities will be given each week. Points will be granted every time this is done.', 5, '45 points per person. (you can do this 3x per week for the 9-week duration)', 3, false),
('Compliment Larissa', 'Compliment Larissa. But be cool about it.', 5, '5 points per person. (You can do this once.)', 1, false),
('Tag a friend on AS socials', 'Tag a friend in a comment on an Actual Size Facebook, LinkedIn, or Instagram post. Points will be granted every time this is done.', 5, '5 points per person. (You can do this once.)', 1, false),
('Joe’s age', 'Find out how old Joe really is.', 5, '5 points per person. (You can do this once.)', 1, false);
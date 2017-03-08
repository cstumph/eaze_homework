Note, I don't expect all of this to be read, I just figured a play by play of my thought process might be helpful/insightful.

===
The first decision I wanted to make is to Yarn or NPM.
Both took roughly the same amount of time to install, but I've noticed significant disparities in install size of `node_modules` when previously using Yarn. While this is not much of an issue if I am only delivering a build file to production, I decided to test the latest versions since I saw that the issue had been addressed in both `yarn` and `create-react-app`.
```
node_modules folder size after install:
NPM 4.1.2 - 72.8MB
Yarn 0.20.3 - 73.3MB
```
Okay! Great! They seem to have fixed this, so I'll opt for Yarn in this case for the deterministic install and caching performance.

===
I notice that `react-scripts` version in `package.json` hasn't been updated since August 2016.  
(https://github.com/facebookincubator/create-react-app/releases/tag/v0.2.1)  
So I updated to the latest to take advantadge of any bug fixes/feature improvements.
The new version of `react-scripts` requires `index.html` to be in the `public` folder, which is actually preferable/more idiomatic IMO.

===
One thing I'll be skipping this project is adding or writing a boiler plate generator. Typically after writing a few components I'd like to figure out the basic component boilerplate, folder structure, and default tests so I can easily skip that step when making a new component.
Ideally, at this stage I'd consider setting up some sort dev-server framework so that I can instantiate components with mock data and run/develop them in isolation. Storybook, looks neat, I'll have to try it out soon.
I'll prob have to write very few comonents for this demo, so it's likely not worth it, nor is trying to establish a distinction between pieces/components, containers, composites, smart/dumb, etc.  
(which is good, because I'm actually currently on the fence in the debate over pages as the sole smart/container components in the app VS creating smart wrappers that can be used at varying levels in the component hierarchy)  
For now, `App` will be the sole `connect()`d container component.

===
Starting off a project, state management is something I actually like to think of upfront. Lately I'm in the habit of embracing the unidirectional nature of pure components (temporary form state is one place I'll often make an exception) and I find immutable data to be worth the upfront cost in helping put that pattern on rails. It's been a little while since I worked with it last and some of the conventions have changed (uh oh). It seems the community has somewhat standardized around making the entire state tree immutable, which makes sense, I just have to initialize my stores/reducers a bit different and pull in a couple extra tools.
So, fully immutable state tree it is then!

===
Once I got through some of the immutable issues, it started to become more or less smooth sailing. Time to start writing some components.
It looks like for now I can get by with just a list element for repos, as that's where a lot of specific display logic will need to be written.

===
So it looks like a clean implementation of CSS modules with local scoping by default is not something that can work without ejecting.  
(https://github.com/facebookincubator/create-react-app/issues/90)  
`className`s will be ugly, but for now it's not a large enough problem to justify ejecting IMO. Should I find a greater need later, it won't be hard to write a script to clean the `:local` prefix from CSS rules later, and moreover, it wouldn't actually be necesarry for anything other than code aesthetics.  
I have `compose` available to me here, so I can actually get pretty far with keeping my styles modular, clean, and easily extractable under this context.

===
From this point on it's basically grinding. Getting the correct data flow to occur in my components, setting up events, making it pretty. Anything I write in the main app container that ends up with me writing more than 2-3 render/helper functions, or grows past say 20 or so lines becomes a candidate for extraction. If the file itself grows to be pretty large in spite of this, I'll  consider extracting things smaller than this criteria. The general goal being to keep each as close to a simple composition as possible.


### MISC
Use this header the explicitly request v3 API (latest)
Accept: application/vnd.github.v3+json




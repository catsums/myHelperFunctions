import * as esbuild from 'esbuild';
import { umdWrapper } from "esbuild-plugin-umd-wrapper";

const Settings = {
	watch: false,
}

process.argv.forEach(function (val) {
	switch(val.toLowerCase()){
		case '--watch':
			Settings.watch = true;
			break;
		default:
			break;
	}
});

let data = [
	{
		entryPoints: ['src/index.ts'],
		bundle: true,
		outfile: 'public/js/bundle.js',
		// format: "umd", // or "cjs"
		plugins: [umdWrapper({
			libraryName: "myLib",
		})],
	},
];

async function Build(){
	
	if(Settings.watch){
		let ctxs = data.map((d)=>{
			return esbuild.context(d);
		});

		Promise.all(ctxs).then((res)=>{
			res.forEach(async(ctx)=>{
				await ctx.watch();
			});
		}).then(()=>{
			console.log("watching...");
		});
	}else{
		data.forEach(async(d,i,arr)=>{
			await esbuild.build(d);
			console.log(`Built ${i} out of ${arr.length}`);
		});
	}
	
}

Build();
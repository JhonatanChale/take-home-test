
import { Get, Controller, Render, Post, Res, HttpStatus } from '@nestjs/common';
//For json response
import { Response } from 'express';
//For octokit (github API)
import { OctokitService } from 'nestjs-octokit';
import { Octokit } from 'octokit';

@Controller()
export class AppController {
  constructor(private readonly octokitService: OctokitService) {}

  //Web page render in browser
  @Get()
  @Render('index')
  root() {}

  //Post request
  @Post()
  async postRequest(@Res() res: Response){
    
    let oDataTable : any = {};

    try{
      //Auth octokit
      const octokit = new Octokit({
        auth: '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'
      })

      //Request to commits
      let response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'JhonatanChale', //Me
        repo: 'take-home-test'  //Repository for this project
      })

      //Filter to get only data to display
      let filteredResponse = new Array();
      response.data.forEach((val, ind, arr) => {
        let line = new Array();
        //Author
        line.push(val.commit.author.date);
        line.push(val.commit.author.name);
        line.push(val.commit.author.email);
        //Commiter
        line.push(val.commit.committer.name);
        line.push(val.commit.committer.email);
        //Message
        line.push(val.commit.message);
        
        filteredResponse.push(line);
      });

      //Datatable response
      oDataTable.data = filteredResponse;
      oDataTable.message = "";
      oDataTable.errno = 0;
    }
    catch(error){
      oDataTable.message = error;
      oDataTable.errno = 500;
      console.log(`Excepción!! ${error}`);
    }

    //Response that filtered data
    res.status(HttpStatus.OK).json(oDataTable);
  }
}

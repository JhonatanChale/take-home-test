import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OctokitModule } from 'nestjs-octokit';

@Module({
  imports: [
    OctokitModule.forRoot({
      isGlobal: true,
      octokitOptions: {
        auth: 'my-github-token',
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

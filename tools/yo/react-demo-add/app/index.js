'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const fs = require('fs');

module.exports = class extends Generator {
    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
          'Welcome to the kickass ' + chalk.red('generator-test') + ' generator!'
        ));

        const prompts = [
            {
                type: 'list',
                name: 'type',
                message: '请选择你要创建的类型?',
                choices: ['routes', 'components']
            }, {
                type: 'input',
                name: 'routesNme',
                message: '请输入你要创建文件的名称！',
                default: 'Feed'
            }
        ];
        // 收集答案
        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {
        if (this.props.type === 'routes') {
            let routesTmpl = _.template(this.fs.read(this.templatePath('./Feed/Feed.jsx')));
            this.fs.write(this.destinationPath(`src/routes/${this.props.routesNme}/${this.props.routesNme}.jsx`), routesTmpl({
                routes_name: this.props.routesNme
            }));
            this.fs.copy(
                this.templatePath('./Feed/Feed.less'),
                this.destinationPath(`src/routes/${this.props.routesNme}/${this.props.routesNme}.less`)
            );
        } else if (this.props.type === 'components') {
            let routesTmpl = _.template(this.fs.read(this.templatePath('./Feed/Feed.jsx')));
            this.fs.write(this.destinationPath(`src/components/${this.props.routesNme}.jsx`), routesTmpl({
                routes_name: this.props.routesNme
            }));
            this.fs.copy(
                this.templatePath('./Feed/Feed.less'),
                this.destinationPath(`src/components/${this.props.routesNme}/${this.props.routesNme}.less`)
            );
        }
    }

    install() {
        // this.installDependencies();
    }
};

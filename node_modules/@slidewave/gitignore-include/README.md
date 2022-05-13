# gitignore Include

Providing the missing link between your .gitignore file and any collection of gitignore samples - including the famous GitHub gitignore project!

## Examples

Basic format for GitHub's gitignore project:

```gitignore
## <include href="https://github.com/github/gitignore/raw/master/Global/Images.gitignore">
# Anything in here will be replaced and updated when you want it to be.
## </include>

# Anything not between the tags is ignored.
whatever/else
```

A local file:

```gitignore
## <include href="file://./other.example">
## </include>
```

Please note that recursive definitions are not yet supported: aka a file including another file that includes something else. That said PRs to solve this and other issues are welcome!

## Installation

Firstly [authenticate NPM with GitHub](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages). When you create the Personal Access Token be sure to grant the `repo` and `read:packages` scopes.

Add the repository to your `~/.npmrc`:

```npmrc
registry=https://npm.pkg.github.com/SlideWave
```

The above two steps have to be done by anyone who pulls from a repository that uses this project.

Install as a development dependency:

```sh
npm install --save-dev @slidewave/gitignore-include
```

Set up your trigger(s). There are several ways to go about this, including programmatic access. See the [Triggers section](#triggers) for more details.

Add `include` directives to your `.gitignore` file. These follow the following, admittedly rigid, format:

```gitignore
## <include href="https://github.com/github/gitignore/raw/master/Node.gitignore">
## </include>
```

See the [Examples section](#examples) for more details.

Also be sure to update any GitHub Actions workflow jobs that use `setup-node` or any form of `npm install`:

```yaml
      - uses: actions/setup-node@v1
        with:
          registry-url: https://npm.pkg.github.com/SlideWave

      - name: Fetch dependencies
        # Skip post-install scripts here, as a malicious script could steal NODE_AUTH_TOKEN.
        run: |
          npm ci --ignore-scripts
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GPR_READ_TOKEN }}
          NODE_ENV: ci # Override so that we get the dev dependencies.

      - name: Build dependencies
        # `npm rebuild` will run all those post-install scripts for us.
        run: npm rebuild && npm run prepare --if-present
```

And add a new secret named `GPR_READ_TOKEN` to your repository. The value of the secret should be a [Personal Access Token](https://github.com/settings/tokens/new) created with the `read:packages` permission.

## Triggers

Without a trigger the include directives are not processed. You can accomplish this several ways, a few of which are outlined below.

### Trigger on NPM prepare

Prepare works like NPM's postinstall, but only runs on the original project, not when being depended upon by another project.

Edit your `package.json` to include the following, assuming you want to run it on all the files that look like gitignore files:

```json
"prepare": "npx -q giismudge .*ignore"
```

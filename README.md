# cipes

cipes is linked in your pipeline
to index your commits and present them in an UI.\
Inspired by [Binocular](https://github.com/INSO-TUWien/Binocular).

Supported Git Systems:
- [GitLab](https://gitlab.com)

### Provided scripts

_Note: If `~` is not working replace it with `/root`._

#### ~/.bashrc

Loads `~/alias.sh` and makes internal preparations.

Provided `variable`s:
- `cipesrcPath`: path to `.cipesrc` File

#### ~/alias.sh

Provided `alias`es:
- `cipes-gitlab`: main executable

Provided `variable`s:
- `cipesDir`: root path of cipes
- `cipesDist`: path of `dist` folder

## GitLab - CI Configuration
Basic `.gitlab-ci` file:
```yaml
index:
  image: rala72/cipes
  variables:
    GIT_DEPTH: 0
  before_script:
    - source ~/.bashrc
    - cp $cipesrc $cipesrcPath
  script: cipes-gitlab
  after_script:
    - source ~/alias.sh
    - cp -r $cipesDist $CI_PROJECT_DIR/cipes/
  artifacts:
    name: cipes
    paths:
      - cipes/
```

*Explanation*:\
First intern preparations have to run and
`.cipesrc` have to be copied.\
Next the main script is executed 
which indices your repository.\
Afterwards the produced files
are saved to your project directory
so it can be provided as artifacts.

Make sure to disable shallow clone
by setting `GIT_DEPTH` to `0`.

Optionally you can also get the `db.json` itself by adding:
```yaml
after_script:
  - cp $cipesDir/db.json $CI_PROJECT_DIR/cipes/
```

### GitLab - Custom Variables
An API access is required therefore
specify a variable named `$cipesrc` with type `File`:
```json
{
  "gitlab": {
    "url": "https://gitlab.com/",
    "token": "YOUR_GITLAB_API_TOKEN"
  }
}
```

Checkout [Binocular](https://github.com/INSO-TUWien/Binocular)
for detailed explanation.

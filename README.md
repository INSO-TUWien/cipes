# cipes

cipes is linked in your pipeline
to index your commits and present them in an UI.\
Inspired by [Binocular](https://github.com/INSO-TUWien/Binocular).

Supported Git Systems:
- [GitLab](https://gitlab.com)

### Provided scripts

_Note: If `~` is not working for you
replace it with `/root`._

#### ~/.bashrc

Loads `~/alias.sh` and makes internal preparations.

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
  before_script:
    - cp $cipesrc $CI_PROJECT_DIR/.cipesrc
    - source ~/.bashrc
  script: cipes-gitlab
  after_script:
    - source ~/alias.sh
    - cp -r $cipesDist $CI_PROJECT_DIR/cipes/
  artifacts:
    name: cipes
    paths:
      - cipes/
```

*Explanation*:
Before the script your `$cipesrc` _(see next section)_
is copied to your project folder.
Then the main script is executed.
Afterwards the produced files are saved to your project directory
so it can be provided as artifacts.

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

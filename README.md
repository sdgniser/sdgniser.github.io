# NISER Software Development Group's website
(still a work in progress)

## TODO
* The navbar links
* Events
* Welcome text
* Blog
* Responsiveness

## How to run local instance
* Install `ruby`, `ruby-gems`. Install `gcc` and `make` if your system doesn't already have them installed
* Install `jekyll` and `bundler` 'gems': `gem install jekyll bundler`
* Clone the repo, `cd` into the cloned repo
* Run `bundle install` to install all gems required by the site.
* `bundle exec jekyll serve` builds the site and serves it locally at http://localhost:4000/

### Instructions to set up RubyGems
* Append `$(ruby -e 'print Gem.user_dir')/bin` to the `PATH` environment variable. (add `PATH="$PATH:$(ruby -e 'print Gem.user_dir')/bin"` to your `~/.profile`/`~/.bash_profile`)
* Allow installation of gems through current user by exporting `GEM_HOME` to the local path. Run: `export GEM_HOME=$HOME/.gem`

#!/user/bin/env perl

use strict;
use warnings;
use v5.30;
#use utf8::all;

use Mojo::URL;
use Mojo::UserAgent;

my $uagent = Mojo::UserAgent->new;
my $url    = Mojo::URL->new('http://openlibrary.org/search.json')
  ->query( author => 'tolkien' );

say $uagent->get($url)->res->json('/docs/0/title');


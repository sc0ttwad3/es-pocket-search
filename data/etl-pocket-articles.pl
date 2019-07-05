#!/user/bin/env perl

# Extract Pocket Items --> Transform with Perl --> Load into Elasticsearch
#
# author: <sc0ttwad3@gmail.com>
# edited: 07.04.19
#
use strict;
use warnings;
use autodie;
use v5.26;

use Data::Dumper;
use JSON::PP;
use LWP::UserAgent;

# Curl command for manual retrieval of
# items from the Pocket API
#
# curl -X POST -H "Content-Type:application/json" -d '{ "consumer_key": "86512-8d937c9f54e5b56cdfada556", "access_token": "623cee3a-f07c-0695-5ebe-bf053f", "detailType": "complete", "state": "all", "sort": "oldest", "count": 2 }' https://getpocket.com/v3/get

my $uri = 'https://getpocket.com/v3/get';
my $json =
'{ "consumer_key": "86512-8d937c9f54e5b56cdfada556", "access_token": "623cee3a-f07c-0695-5ebe-bf053f", "detailType": "complete", "state": "all", "sort": "oldest", "count": 2 }';

my $req = HTTP::Request->new( 'POST', $uri );
$req->content_type('application/json');
$req->content($json);

my $ua  = LWP::UserAgent->new;
my $res = $ua->request($req);
my %pocket_data_object;

if ( $res->is_success ) {
    %pocket_data_object = $res->decoded_content;
    # debug to console
    # print $articles;
}
else {
    print STDERR $res->status_line, "\n";
}

print my %ids = $pocket_data_object{"list"};

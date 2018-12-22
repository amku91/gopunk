# GOpunk | Your Punk Buddy

# Project Info

This project built by using following technology:

1. Angular 6
2. Angular Material Design
3. Karma & Jasmine
4. Punk API's
5. Codeship(CI / CD)
6. Docker(Cloud Server)

##Thanks to All :)

# API's Bugs

There are one bug in punk api. Look below two example: 
`
1. https://api.punkapi.com/v2/beers?abv_lt=5   Status: OK (200)
2. https://api.punkapi.com/v2/beers?abv_lt=0.5  Status: Bad Request (400) 

This problem persist in both GET/POST call. Looks like float number are not allowed.
`

# Project Assumptions

Project assumptions as follows:

1. There is no filter for description and looks like `beer_name` filter also working on description. So both filter aligned to `beer_name` param. If you want to check wheather description is present or not in beer api data; beer wise. So just uncomment code in home.component.ts file.

2. As you can see above float number not allowed in API's call. So for non alcholic using condition 
    `abv_gt > 0 and abv_lt < 1`.


# Generated Through | Installation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2. Remaning Details you can get by visiting Angular website.
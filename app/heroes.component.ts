import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls:  ['app/heroes.component.css']
})

export class HeroesComponent implements OnInit {
	heroes: Hero[];
	selectedHero: Hero;
	error: any;

	constructor(
		private heroService: HeroService,
		private router: Router) {
	}

	getHeroes(): void {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  	}

  	ngOnInit(): void {
		this.getHeroes();
	}

	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

	gotoDetail(): void {
    	this.router.navigate(['/detail', this.selectedHero.id]);
  	}

  	addHero(): void {
		this.addingHero = true;
		this.selectedHero = null;
	}

	close(savedHero: Hero): void {
		this.addingHero = false;
		if (savedHero) { this.getHeroes(); }
	}

	deleteHero(hero: Hero, event: any): void {
		event.stopPropagation();
		this.heroService
		  .delete(hero)
		  .then(res => {
		    this.heroes = this.heroes.filter(h => h !== hero);
		    if (this.selectedHero === hero) { this.selectedHero = null; }
		  })
		  .catch(error => this.error = error);
		}
}
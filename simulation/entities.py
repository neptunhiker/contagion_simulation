import numpy as np
from scipy.stats import norm

from .viruses import Virus

class Entity:
    def __init__(self, id: int, x: float, y: float, health: int, is_infected: bool = False) -> None:
        self.id = id
        self.health = health  # Health could represent a health score or hit points
        self.is_infected = is_infected  # Boolean to track infection status
        self.infection_time = 0
        self.virus = None
        self.recovery_time = None
        self.x = x
        self.y = y

    def move(self, delta_x: float, delta_y: float):
        """Update the entity's position."""
        self.x += delta_x
        self.y += delta_y
        
    def infect(self, virus: Virus):
        """Infect the entity with a virus."""
        self.is_infected = True
        self.virus = virus
        self.recovery_time = norm.ppf(np.random.uniform(0, 1), loc=virus.mean_recovery_time, scale=virus.sd_recovery_time)
        
    def recover(self):
        """Attempt to recover from infection."""
        if self.is_infected:
            self.infection_time += 1
            if self.infection_time >= self.recovery_time:
                self.is_infected = False
                self.virus = None
                self.infection_time = 0
                self.health = 100  # Restore health upon recovery

    def display_status(self):
        """Display the current status of the entity."""
        status = (f"Entity Name: {self.name}\n"
                  f"Health: {self.health}\n"
                  f"Infected: {'Yes' if self.is_infected else 'No'}\n"
                  f"Infection Time: {self.infection_time} days\n"
                  f"Recovery Time: {self.recovery_time} days\n")
        print(status)

    def serialize(self):
        """Serialize the entity object to a dictionary."""
        return {
            'name': self.name,
            'health': self.health,
            'is_infected': self.is_infected,
            'infection_time': self.infection_time,
            'recovery_time': self.recovery_time,
        }


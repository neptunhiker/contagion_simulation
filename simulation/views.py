# simulation/views.py
from typing import Any
from django.shortcuts import render
from django.views.generic import TemplateView

from .viruses import Virus

def index(request):
    return render(request, 'simulation/index.html')
  
class SimulationView(TemplateView):
    template_name = 'simulation/simulation.html'

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        return context

    
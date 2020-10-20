#!/usr/bin/env python3

import pandas as pd
import matplotlib

import pandas as pd
import sqlite3
from django.db import models

from test.models import Client


# print(Client.objects.all().values())
df = pd.DataFrame(list(Client.objects.all().values()))
del df['password']
print(df)